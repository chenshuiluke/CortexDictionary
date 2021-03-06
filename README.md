[![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=org.nativescript.CortexDictionary)

# Running/Running

1. Run `sudo npm install -g nativescript`
2. `cd` into the repo directory and run `npm install` 
3. After you install the nativescript CLI and all other basic requirements, like the Android Sdk, you'll need to configure your environment variables.

To do so, just create two files `app/environment/environment.prod.ts` and `app/environment/environment.ts` and give them both the following content:

	export const environment = {
	    oxford_api:{
			base_url: "https://od-api.oxforddictionaries.com/api/v1",
			app_id: "<app_id>",
			app_key: "<app_key>"
	    },
	    urban_dict_api:{
			base_url: "http://api.urbandictionary.com/v0/define"
	    },
		word_api:{
			base_url: "https://wordsapiv1.p.mashape.com/words",
			app_id: "cortexdictionary_5a47e0a0e4b03dc727eee34d",
			app_key: "qjesu1R7WNmshQmu2eq4OPlN9QdSp14YSaUjsnO44eG5ARVbkr"
    	},
		prod: true
		//Change this to false when not bundling with webpack
		//Change to true when bundling with webpack
	}

Of course, you need to replace <app_id> and <app_key> with your own app id and key for the Oxford API.

4. After connecting your Android device/emulator to adb, run the app with `tns run android --bundle --env.uglify --env.aot --env.snapshot`
5. Build the app with `tns build android --bundle --env.uglify --env.aot --env.snapshot`
