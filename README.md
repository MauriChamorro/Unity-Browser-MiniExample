# Communicating between Unity and the Browser

## Introducción

El objetivo fue experimentar con [**WebAssembly**](https://blogs.unity3d.com/2018/08/15/webassembly-is-here/) y lograr la comunicación entre **Unity** y **JavaScript** a modo de aprendizaje para futuras aplicaciones.

Para ello se utilizó un juego completo simple [_Flappy Bird Style Example Game_](https://assetstore.unity.com/packages/templates/flappy-bird-style-example-game-80330) desde el Asset Store de Unity.

## Unity hacia JS

Para lograr esta comunicación se debe crear una carpeta **Assets/Plugins** y dentro de esta un **archivo.jslib** que contrendrá el código JS como libreria.

Todo el código JS debe estar contendido dentro de una firma tal como:

```javascript
mergeInto(LibraryManager.library, {
  // code
  }
```

Dentro del bloque se declara _Etiquetas:_ y su código JS asociado. Estas etiquetas seran la _firma externa_ de la libreria JS.

```javascript
mergeInto(LibraryManager.library, {
    //tag: js function
  JS_BirdDied: function () {
    var body = document.getElementsByTagName("body")[0];
    body.style.transition = "1s all";
    body.style.background = "red";
  },
  ....
}
```

Por último se llama desde Unity desde cualquier **clase C#**. Para ello declaramos una _variable_ como acceso a la etiqueta externa JS previamente definida:

```c#
 #region JS_IMPORT
    //Linkear JS's
    [DllImport("__Internal")]
    public static extern void JS_BirdDied();
 #endregion
```

Con esto ya es posible utilizarla en cualquier parte del código C# _\*dentro de la clase donde se declaro la **variable**_, como por ejemplo:

```c#
    //C# method
    public void BirdDied()
	{
		//Activate the game over text.
		gameOvertext.SetActive (true);
		//Set the game to be over.
		gameOver = true;

		if (Application.platform == RuntimePlatform.WebGLPlayer)
		{
                  //JS method
		  JS_BirdDied();
		}
	}
```

## JS hacia Unity

A modo de simplicidad, se hace global la variable _gameInstance_:

```css
window.gameInstance = UnityLoader.instantiate("gameContainer", "Build/Build.json",
{
    onProgress: UnityProgress, Module: { onRuntimeInitialized:
onInit, },
...
});
```

Como se observa, se llama a la función JS _onInit_ cuando finaliza la carga de la isntacia _gameInstance_, indicado mediante _onRuntimeInitialized_.

Declaración de **onInit**:

```javascript
function onInit() {
  document
    .getElementById("flapImage")
    .addEventListener("mousedown", function() {
      window.gameInstance.SendMessage("Bird", "DoFlap");
    });
}
```

Se agrega un evento JS para ejecutar el código:

```javascript
        document.getElementById("flapImage").addEventListener('mousedown',function()
```

Luego, la linea de código que realiza la llamada a un método de una clase en C# es:

```javascript
window.gameInstance.SendMessage("Bird", "DoFlap");
```

Con esto se está diciendo que ejecute el método _DoFlap_ de la clase _Bird_.

En caso de que se desee enviar un parámetro, sería:

```javascript
window.gameInstance.SendMessage("Bird", "DoFlap", "stringValue");
window.gameInstance.SendMessage("Bird", "DoFlap", 1);
...
```

## Prueba el juego

[Aquí](https://maurichamorro.github.io/Unity-Browser-MiniExample/) podrás probar el juego.

El _bóton html_ **Flap** es el que realizar la llamada desde _JS a Unity_.

Cuando el pájaro muere y revive, _Unity llama a funciones de JS_ para cambiar el _background_ del _html_.

## Conclusión

[**WebAssembly**](https://blogs.unity3d.com/2018/08/15/webassembly-is-here/) es una interesante y poderosa herramienta que potencia el desarrollo web.

Desde mi punto de vista esta tecnología tiene mucho futuro por delante.

El proyecto esta completo para estudiarlo más a fondo.

## Contáctame

Puedes escribirme a mi email **mmchamoo@gmail.com** o agregarme a [**LinkedIn**](https://www.linkedin.com/in/mauricio-manuel-chamorro).
