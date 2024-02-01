export const isFunction = (target: any): target is Function => typeof target === 'function';

export type SubscriberFunc = () => void;
export let targetFunc: SubscriberFunc | null = null;

export const useEffect = (effect: SubscriberFunc) => {
targetFunc = effect;
targetFunc();
targetFunc = null;
};


const appendChild = (parent: Node, child: Node | string | Array<Node | string>, j = 0) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild, i) => appendChild(parent, nestedChild, i));
    } else {
        if (!parent.childNodes[j]) {
            parent.appendChild(child instanceof Node ? child : document.createTextNode(child));
        } else if (child !== parent.childNodes[j].nodeValue) {
            parent.childNodes[j].nodeValue = String(child);
        }
    }
};
  
  type Props = {
    children?: any;
    [key: string]: any;
  };
  
  export const jsx = (tag: string | ((props: Props) => HTMLElement), props: Props) => {
    
    // deconstruct children from props
    const { children } = props;
    // if tag is a function, call it with props
    if (isFunction(tag)) return tag(props);
    // otherwise, create an element with the tag
    const element = document.createElement(tag as string);
    // loop through props
    Object.entries(props || {}).forEach(([name, value]) => {
        // if name is an event, add a listener
      if (name.startsWith('on') && name.toLowerCase() in window) {
        element.addEventListener(name.toLowerCase().substr(2), value as EventListener);
      } else {
        // otherwise, set the attribute
        element.setAttribute(name, value as string);
      }
    });
  
    useEffect(() => {
        // make array of children
      const list = Array.isArray(children) ? children : [children];
        // loop through children
    /**
     * Maps each element in the list and returns an array of the resulting values.
     *
     * @template T - The type of elements in the list.
     * @param {Array<T | (() => T)>} list - The list of elements to map.
     * @returns {Array<T>} - The array of mapped values.
     */
      const res = list.map((child) => {
        // if child is a function, call it
        const value = isFunction(child) ? child() : child;
        
        return value;
      });
      // if child is an element, append it
      appendChild(element, res);
    });
  
    return element;
  };
  
  export const jsxs = jsx;