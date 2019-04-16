<p align="center">
The classic todos application example, made into a Desktop application using <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a> and <a href="https://github.com/atlassian/react-beautiful-dnd">React Beautiful Drag and Drop</a>
</p>

<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<hr>

<div align="center">

Enjoy this ridiculously large gif too!

![Todos](https://user-images.githubusercontent.com/21677/56250100-aac60600-60f1-11e9-8386-e1795b219825.gif)

</div>

## How do I run it (only as a development build)

_There are no built packages available, they won't be compiled as platform installers until the 1.0.0 release._

We will assume that you have node, npm and yarn installed as a minimum.

First, clone the repo into an empty folder:

```bash
$ git clone git@github.com:Asciant/Todos.git
```

And then install the dependencies with yarn:

```bash
$ cd Todos
$ yarn
```

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## License

MIT © [Todos by asciant](https://github.com/asciant/Todos)
