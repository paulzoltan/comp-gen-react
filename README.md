# Comp-Gen

Comp-Gen is a command-line tool for generating React components with optional TypeScript and CSS support. It allows you to quickly create a new React component with a single command.

## Installation

Comp-Gen can be installed globally via npm:

```
npm install -g comp-gen
```

## Usage

To use Comp-Gen, simply type `comp-gen` followed by the name of the component you want to create. You can use the following options to customize your component:

- `-t, --typescript`: Use TypeScript
- `-T, --no-typescript`: Don't use TypeScript
- `-c, --css`: Include CSS
- `-C, --no-css`: Omit CSS
- `-p, --preprocessor <type>`: CSS Preprocessor: css or scss
- `-P, --path <path>`: Path to create component

For example, to create a new component named `MyComponent` with TypeScript and CSS support, you can run:

```
comp-gen MyComponent -t -c
```

By default, components are created in the `src/components` directory. You can specify a different directory using the `-P, --path` option.

## Configuration

Comp-Gen uses a configuration file to store your preferred settings. If you run `comp-gen` without a configuration file, it will prompt you to answer a few questions to generate a default configuration file.

The configuration file is stored as a JSON file named `comp-gen.config.json`. You can modify this file manually to change your default settings.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was inspired by [create-react-app](https://github.com/facebook/create-react-app).
