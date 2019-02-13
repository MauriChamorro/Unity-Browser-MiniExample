mergeInto(LibraryManager.library, {

  JS_BirdDied: function () {
    //first instance
    var body = document.getElementsByTagName("body")[0];
    body.style.transition = "1s all";
    body.style.background = "red";
  },

  JS_BirdSpawned: function () {
    var body = document.getElementsByTagName("body")[0];
    body.style.transition = "1s all";
    body.style.background = "white";
  },

  HelloString: function (str) {
    window.alert(Pointer_stringify(str));
  },

  PrintFloatArray: function (array, size) {
    for(var i = 0; i < size; i++)
    console.log(HEAPF32[(array >> 2) + i]);
  },

  AddNumbers: function (x, y) {
    return x + y;
  },

  StringReturnValueFunction: function () {
    var returnStr = "bla";
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },

  BindWebGLTexture: function (texture) {
    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[texture]);
  },

});