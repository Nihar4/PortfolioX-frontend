import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
    builder
        .addCase("loginRequest", (state) => {
            state.loading = true;
        })
        .addCase("loadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("logoutRequest", (state) => {
            state.loading = true;
        })
        .addCase("registerRequest", (state) => {
            state.loading = true;
        });
    builder
        .addCase("loginSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        })
        .addCase("loadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;

        })
        .addCase("logoutSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            state.user = null;
        })
        .addCase("registerSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        });
    builder
        .addCase("loginFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("loadUserFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("logoutFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })
        .addCase("registerFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        });

    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});



export const profileReducer = createReducer({}, (builder) => {
    builder
        .addCase("updateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateProfilePictureRequest", (state) => {
            state.loading = true;
        })
        .addCase("changePasswordRequest", (state) => {
            state.loading = true;
        })
        .addCase("forgetPasswordRequest", (state) => {
            state.loading = true;
        })
        .addCase("resetPasswordRequest", (state) => {
            state.loading = true;
        })
        .addCase("removeFromPlaylistRequest", (state) => {
            state.loading = true;
        })
        .addCase("addToPlaylistRequest", (state) => {
            state.loading = true;
        })
        .addCase("getPortfolioRequest", (state) => {
            state.loading = true;
        })
        .addCase("getWatchListRequest", (state) => {
            state.loading = true;
        });

    builder
        .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateProfilePictureSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("changePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("forgetPasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("resetPasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("removeFromPlaylistSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("addToPlaylistSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("getPortfolioSuccess", (state, action) => {
            state.portfolio = action.payload;
            state.loading = false;

        })
        .addCase("getWatchListSuccess", (state, action) => {
            state.loading = false;
            state.watchlist = action.payload;

        });
    builder
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("updateProfilePictureFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("changePasswordFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("forgetPasswordFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("resetPasswordFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("removeFromPlaylistFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("addToPlaylistFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("getPortfolioFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase("getWatchListFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});


export const otherReducer = createReducer({}, (builder) => {
    builder
        .addCase("contactRequest", (state) => {

            state.loading = true;
        });
    builder
        .addCase("contactSuccess", (state, action) => {

            state.loading = false;
            state.message = action.payload;
        });
    builder
        .addCase("contactFail", (state, action) => {

            state.loading = false;
            state.error = action.payload;
        });
    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});

const subscriptionReducer = createReducer(
    {},
    (builder) => {
        builder
            .addCase('buySubscriptionRequest', (state) => {
                state.loading = true;
            })
            .addCase('buySubscriptionSuccess', (state, action) => {
                state.loading = false;
                state.subscriptionId = action.payload;
            })
            .addCase('buySubscriptionFail', (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase('clearSubscriptionId', (state, action) => {
                state.loading = false;
                state.subscriptionId = null;
            })
            .addCase('cancelSubscriptionRequest', (state) => {
                state.loading = true;
            })
            .addCase('cancelSubscriptionSuccess', (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase('cancelSubscriptionFail', (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase('clearError', (state) => {
                state.error = null;
            })
            .addCase('clearMessage', (state) => {
                state.message = null;
            });
    }
);

export default subscriptionReducer;



