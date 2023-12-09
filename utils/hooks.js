import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { loadUser } from "../redux/action/user";
import { CommonActions } from '@react-navigation/native';

const showToast = (message, type) => {
    // Define the prefixes you want to remove
    const prefixesToRemove = ["User validation failed: "];

    // Remove prefixes from the message
    for (const prefix of prefixesToRemove) {
        if (message.startsWith(prefix)) {
            message = message.slice(prefix.length);
        }
    }

    const maxLineLength = 37; // Set your preferred maximum line length


    if (message.length <= maxLineLength) {
        Toast.show({
            type: 'success',
            text1: message,
        });
    } else {
        const lines = [];
        let remainingMessage = message;

        while (remainingMessage.length > maxLineLength) {
            // Search for the last space, comma, or colon within the maximum line length
            let lastBreak = remainingMessage.lastIndexOf(' ', maxLineLength);
            if (remainingMessage.lastIndexOf(',', maxLineLength) > lastBreak) {
                lastBreak = remainingMessage.lastIndexOf(',', maxLineLength);
            }
            if (remainingMessage.lastIndexOf(':', maxLineLength) > lastBreak) {
                lastBreak = remainingMessage.lastIndexOf(':', maxLineLength);
            }

            if (lastBreak === -1) {
                // If no suitable break point is found, split at maxLineLength
                lastBreak = maxLineLength;
            }

            const line = remainingMessage.slice(0, lastBreak);
            lines.push(line);
            remainingMessage = remainingMessage.slice(lastBreak).trim();
        }

        lines.push(remainingMessage);

        Toast.show({
            type: 'success',
            text1: lines[0], // First line
            text2: lines[1], // Second line
            text3: lines.slice(2).join(' '), // Rest of the lines
        });
    }
}


export const useMessageAndErrorUser = (
    navigation,
    dispatch,
    navigateTo
) => {
    const LoginNavigator = "Profile1"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error, user } = useSelector((state) => state.user);

    let load = false;

    useEffect(() => {
        if (error) {
            // Toast.show({
            //     type: "error",
            //     text1: error,
            // });
            showToast(error, "error");
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            if (message.includes("Welcome back") || message.includes("Registered Successfully")) {
                load = true;
                // navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0, // Index of the screen to navigate to (0 for the first screen)
                //         routes: [{ name: LoginNavigator }], // Array of route objects, specify the screen to navigate to
                //     })
                // );
                navigation.navigate("Profile1", {
                    screen: "Profile",
                });
                dispatch(loadUser());
            }

            if (message.includes("Logged Out Successfully")) {
                navigation.navigate("Home1", {
                    screen: "Home",
                });
            }
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorProfile = (
    navigation,
    dispatch,
    navigateTo
) => {
    const LoginNavigator = "Profile"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error } = useSelector((state) => state.profile);

    useEffect(() => {
        if (error) {
            // Toast.show({
            //     type: "error",
            //     text1: error,
            // });
            showToast(error, "error");
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: navigateTo }],
                    })
                );
                // navigation.navigate(navigateTo);

            }
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorOther = (
    navigation,
    dispatch,
    navigateTo
) => {
    const LoginNavigator = "Profile1"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error } = useSelector((state) => state.other);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {

            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: navigateTo }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            // dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorSubscription = (
    navigation,
    dispatch,
    navigateTo
) => {

    const { loading, message, error, subscriptionId } = useSelector((state) => state.subscription);

    useEffect(() => {
        if (error) {
            showToast(error, "error");
            dispatch({
                type: "clearError",
            });
        }

        if (message) {

            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: navigateTo }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return { loading, subscriptionId };
};

