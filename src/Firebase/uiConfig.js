import firebase from 'firebase';

const uiConfig = {
    callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    var user = authResult.user;
    var credential = authResult.credential;
    var isNewUser = authResult.additionalUserInfo.isNewUser;
    var providerId = authResult.additionalUserInfo.providerId;
    var operationType = authResult.operationType;
    if (isNewUser) {
    firebase.firestore().collection("users").doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL


    
    })}
    // if (isNewUser) {
    //   firebase.firestore().collection("users").doc("LA").set


    // }
    // Do something with the returned AuthResult.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    return true;
    },
    signInFailure: function(error) {
    // Some unrecoverable error occurred during sign-in.
    // Return a promise when error handling is completed and FirebaseUI
    // will reset, clearing any UI. This commonly occurs for error code
    // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
    // occurs. Check below for more details on this.
    // return handleUIError(error);
    },
    },
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    signInFlow:'popup',
    signInSuccessUrl: '',
    signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,

    ],
    credentialHelper: 'none'
    }

  export default uiConfig 