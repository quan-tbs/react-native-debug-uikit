package com.margelo.nitro.debugtoolkit
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class DebugToolkit : HybridDebugToolkitSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
