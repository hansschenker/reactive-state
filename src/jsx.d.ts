declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
    interface JSXElement {
        tagName: string;
        props: any;
        children: JSXElement[];
    }
}