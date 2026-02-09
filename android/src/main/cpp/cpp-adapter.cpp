#include <jni.h>
#include "debugtoolkitOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::debugtoolkit::initialize(vm);
}
