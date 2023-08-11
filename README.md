# Comp-Gen-React

Comp-Gen-React is a command-line tool for generating React components with optional TypeScript and CSS support. It allows you to quickly create a new React component with a single command.

## Installation

Comp-Gen-React can be installed globally via npm:

```
npm install -g comp-gen-react
```

## Usage

To use Comp-Gen-React, simply type `comp-gen-react` followed by the name of the component you want to create. You can use the following options to customize your component:

- `-t, --typescript`: Use TypeScript
- `-T, --no-typescript`: Don't use TypeScript
- `-c, --css`: Include CSS
- `-C, --no-css`: Omit CSS
- `-p, --preprocessor <type>`: CSS Preprocessor: css or scss
- `-P, --path <path>`: Path to create component

For example, to create a new component named `MyComponent` with TypeScript and CSS support, you can run:

```
comp-gen-react MyComponent -t -c
```

By default, components are created in the `src/components` directory. You can specify a different directory using the `-P, --path` option.

## Configuration

Comp-Gen-React uses a configuration file to store your preferred settings. If you run `comp-gen-react` without a configuration file, it will prompt you to answer a few questions to generate a default configuration file.

The configuration file is stored as a JSON file named `comp-gen-react.config.json`. You can modify this file manually to change your default settings.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was inspired by [create-react-app](https://github.com/facebook/create-react-app).
