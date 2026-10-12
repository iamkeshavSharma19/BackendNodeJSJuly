
package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"golang.org/x/crypto/bcrypt"
)

var UsersCollection *mongo.Collection

type User struct {
	ID        bson.ObjectID `bson:"_id,omitempty" json:"_id"`
	FirstName string        `bson:"firstName" json:"firstName"`
	LastName  string        `bson:"lastName" json:"lastName"`
	EmailID   string        `bson:"emailId" json:"emailId"`
	Password  string        `bson:"password" json:"-"`
}

type AuthRequest struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	EmailID   string `json:"emailId"`
	Password  string `json:"password"`
}

type Response map[string]interface{}

func respond(w http.ResponseWriter, status int, data Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

// SIGNUP
func HandleUserSignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		respond(w, http.StatusMethodNotAllowed, Response{
			"success": false,
			"message": "Method not allowed",
		})
		return
	}

	var body AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respond(w, http.StatusBadRequest, Response{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	body.FirstName = strings.TrimSpace(body.FirstName)
	body.LastName = strings.TrimSpace(body.LastName)
	body.EmailID = strings.TrimSpace(body.EmailID)

	if body.FirstName == "" || body.EmailID == "" ||
		body.Password == "" {
		respond(w, http.StatusBadRequest, Response{
			"success": false,
			"message": "Required signup fields are missing",
		})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	// Check whether the email is already registered.
	var existing User
	err := UsersCollection.FindOne(
		ctx,
		bson.M{"emailId": body.EmailID},
	).Decode(&existing)

	if err == nil {
		respond(w, http.StatusConflict, Response{
			"success": false,
			"message": "Email is already registered",
		})
		return
	}

	if err != mongo.ErrNoDocuments {
		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Something went wrong",
		})
		return
	}

	// Hash the password using bcrypt cost 12.
	passwordHash, err := bcrypt.GenerateFromPassword(
		[]byte(body.Password), 12,
	)
	if err != nil {
		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Could not hash password",
		})
		return
	}

	user := User{
		ID:        bson.NewObjectID(),
		FirstName: body.FirstName,
		LastName:  body.LastName,
		EmailID:   body.EmailID,
		Password:  string(passwordHash),
	}

	_, err = UsersCollection.InsertOne(ctx, user)
	if err != nil {
		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Could not create user",
		})
		return
	}

	respond(w, http.StatusCreated, Response{
		"message": "User signed up successfully",
		"success": true,
		"user":    user,
	})
}

// LOGIN
func HandleUserLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		respond(w, http.StatusMethodNotAllowed, Response{
			"success": false,
			"message": "Method not allowed",
		})
		return
	}

	var body AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respond(w, http.StatusBadRequest, Response{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	body.EmailID = strings.TrimSpace(body.EmailID)

	if body.EmailID == "" || body.Password == "" {
		respond(w, http.StatusBadRequest, Response{
			"success": false,
			"message": "EmailId or Password is missing",
		})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var user User
	err := UsersCollection.FindOne(
		ctx,
		bson.M{"emailId": body.EmailID},
	).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			respond(w, http.StatusUnauthorized, Response{
				"success": false,
				"message": "Email or password is incorrect",
			})
			return
		}

		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Something went wrong",
		})
		return
	}

	// Compare the submitted password with the stored hash.
	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(body.Password),
	)
	if err != nil {
		respond(w, http.StatusUnauthorized, Response{
			"success": false,
			"message": "Email or password is incorrect",
		})
		return
	}

	// Generate a JWT valid for 8 hours.
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Authentication configuration error",
		})
		return
	}

	now := time.Now()
	claims := jwt.MapClaims{
		"sub": user.ID.Hex(),
		"iat": now.Unix(),
		"exp": now.Add(8 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		respond(w, http.StatusInternalServerError, Response{
			"success": false,
			"message": "Could not create authentication token",
		})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		Expires:  now.Add(8 * time.Hour),
		MaxAge:   8 * 60 * 60,
		HttpOnly: true,
		Secure:   os.Getenv("COOKIE_SECURE") == "true",
		SameSite: http.SameSiteLaxMode,
	})

	respond(w, http.StatusOK, Response{
		"success":       true,
		"message":       "User LoggedIn Successfully",
		"loggedInUser":  user,
	})
}

// LOGOUT
func HandleUserLogout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		respond(w, http.StatusMethodNotAllowed, Response{
			"success": false,
			"message": "Method not allowed",
		})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
		Secure:   os.Getenv("COOKIE_SECURE") == "true",
		SameSite: http.SameSiteLaxMode,
	})

	respond(w, http.StatusOK, Response{
		"success": true,
		"message": "User Logged Out Successfully",
	})
}
