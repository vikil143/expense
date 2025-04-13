package com.expenseapp

import android.app.Activity
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.*

class UpiPaymentModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String {
        return "UpiPayment"
    }

    @ReactMethod
    fun initiatePayment(upiId: String, name: String, note: String, amount: String, promise: Promise) {
        val uri = Uri.parse("upi://pay").buildUpon()
            .appendQueryParameter("pa", upiId)
            .appendQueryParameter("pn", name)
            .appendQueryParameter("tn", note)
            .appendQueryParameter("am", amount)
            .appendQueryParameter("cu", "INR")
            .build()

        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = uri

        val activity: Activity? = currentActivity

        if (intent.resolveActivity(context.packageManager) != null && activity != null) {
            activity.startActivity(intent)
            promise.resolve("Payment flow started")
        } else {
            promise.reject("NO_UPI_APP", "No UPI app found on device.")
        }
    }
}
