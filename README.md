# Communicating between Unity and the Browser - *Flappy Bird Style Example Game*

## Introducción
El objetivo fue realizar un mini juego en [**WebAssembly**](https://blogs.unity3d.com/2018/08/15/webassembly-is-here/) y lograr la comunicación entre **Unity** y **JavaScript** a modo de aprendizaje para futuras aplicaciones. El juego prototipo fue obtenido desde [Asset Store](https://assetstore.unity.com/packages/templates/flappy-bird-style-example-game-80330) de Unity.

## Unity hacia JS
Para lograr esta comunicación se debe crear una caarpeta **Assets/Plugins** y destro de esta un **archivo.jslib**. 

Todo el código JS debe estar contendido dentro de una firma tal como:
```javascript
mergeInto(LibraryManager.library, {
  // code
  }
```

Dentro de esta bloque se declara **Etiquetas:**  y su código JS asociado. Estas etiquetas seran la *firma externa* de la libreria JS.

Dentro de dicho bloque se declaran las funciones JS y su lógica.
```javascript 
mergeInto(LibraryManager.library, {

  JS_BirdDied: function () {
    //first instance
    var body = document.getElementsByTagName("body")[0];
    body.style.transition = "1s all";
    body.style.background = "red";
  }, 
  ....
}
```

Por último se llama desde Unity:

Dentro de una **clase C#** declaramos una *variable* como acceso al método JS: 

```c#
 #region JS_IMPORT
    //Linkear JS's
    [DllImport("__Internal")]
    public static extern void JS_BirdDied();
 #endregion
```
Luego ya podemos utilizarla en cualquier parte del código C#, como por ejemplo:
```c#
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
A modo de simplicidad, se hace global la variable de *gameInstance*:

```html
window.gameInstance = UnityLoader.instantiate("gameContainer", "Build/Build.json", {
        onProgress: UnityProgress,
        Module: {
                  onRuntimeInitialized: onInit,
    },});
```

Además como se observa, se llama a la función *onInit* cuando la carga de la isntacia apenas finaliza.

Esta función contiene:
```javascript
function onInit(){
    document.getElementById("flapImage").addEventListener('mousedown',function()
    {
        window.gameInstance.SendMessage("Bird","DoFlap");
    });
}
```

Esto es un ejemplo sencillo para obtener el elemento que contiene la llamada a la función en Unity:
```javascript
        document.getElementById("flapImage").addEventListener('mousedown',function()
```

Sin embargo, esta es la linea importante ya que realiza la llamada a un método de una clase en C#:
```javascript
        window.gameInstance.SendMessage("Bird","DoFlap");
```
Esto signigfica que ejecute el método *DoFlap* de la clase *Bird*. En caso de que se desea enviar un parámetro, sería:

```javascript
        window.gameInstance.SendMessage("Bird","DoFlap","stringValue");
```

## Prueba el juego
[Aquí](https://maurichamorro.github.io/UnityWebGLInteractBrowserTest/) podrás probar el juego.

El *bóton* html "Flap" es que realizar la llamada desde *JS a Unity*.

Cuando muere y revive el pájaro, *Unity llama a funciones de JS* para cambiar el *background* del html.
## Conclusión
WebAssembly es una interesante y poderosa herramienta que potencia el desarrollo web. 

Desde mi punto de vista esta tecnología tiene mucho futuro por delante.

## Contáctame
Puedes escribirme a mi email __mmchamoo@gmail.com__ o agregarme a [LinkedIn](https://www.linkedin.com/in/mauricio-manuel-chamorro).
