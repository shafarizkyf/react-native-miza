React Native Miza is a bolilerplate to safe your time when reacting a new project.

### What's included

- Splashscreen
- Onboarding screen
- Login screen
- Signup/Registration screen
- Forgot password screen
- OTP Screen

### Overview

I have created a video dedicated for this project. Unfortunately it's in Indonesian language. https://youtu.be/mxerVB_RFiU

### Deploy .apk via Firebase Distribution

APP_ID is here
https://console.firebase.google.com/u/0/project/firebase-project-id/settings/general/android-bundle-name > Android Apps > APP ID

`firebase appdistribution:distribute ./android/app/build/outputs/apk/release/app-release.apk --token "$FIREBASE_TOKEN" --app APP_ID --groups "Internal" --release-notes "init build"`
