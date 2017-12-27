[![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=org.nativescript.CortexDictionary)

# Running

After you install the nativescript CLI and all other basic requirements, like the Android Sdk, you'll need to configure your environment variables.

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
	    prod: false
	}

Of course, you need to replace <app_id> and <app_key> with your own app id and key for the Oxford API.
