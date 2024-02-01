import { interval, map, take } from "rxjs";


// Define a simple JSX factory function
const jsx = (tag: string, props: Record<string, any>, ...children: (string | HTMLElement)[]) => {
  const element = document.createElement(tag);

  Object.assign(element, props);
  console.log("element:",element)
  props.class && element.classList.add(props.class);
  children.forEach(child => {
    if (typeof child === 'string') {
      element.textContent = child;
    } else {
      element.appendChild(child);
    }
  });
  return element;
};

// Define the Button component
const Button = ( ) => {
  let count = 0;
  const countElement = jsx('h1', {class: 'count'}, `Count: ${count}`);

  interval(1000).pipe(take(5)).subscribe(v => {
    count += v;
    countElement.textContent = `Count: ${count}`;
  });

  return jsx('div', {class: 'count'}, countElement);
};

// Render the Button component
document.body.appendChild(Button());











// import observableState from "./observable-state";
// import ReactiveState, { Observer, StateChangeHandler } from "./reactive-state";
// import { Person } from "./person";
// import { Button } from "./button";


// const nameSpan   = document.getElementById("nameSpan") as HTMLSpanElement;
// const ageSpan   = document.getElementById("ageSpan") as HTMLSpanElement;

// let person = {
//     name: "Eirik",
//     age: 31,
//   };
// person = observableState(person, ({ key, value }) => {
//   console.log(`${String(key)} changed with observable to ${value}`);
//   renderPerson(person);
// });

// const ageBtn = document.getElementById("ageBtn") as HTMLButtonElement;
// ageBtn.addEventListener("click", () => {
//     person.age++;
//     person.name ="Johnny"

// });

// person.age = 34;
// person.name= "Konrad"

// const age$ = interval(1000).pipe(
//     map((i) => i + 1),
//     take(10)
//     );
// age$.subscribe((v) => { 
//     console.log("v",v);
//     reactiveState.getState().sequence = v;
//     person.age = v; 
// });


// function renderPerson(person:Person){
//     nameSpan.innerText = person.name;
//     ageSpan.innerText = person.age.toString();
// }

// type Todo = { id: number; title: string; sequence: number};

// // Define an observer function
// const observer: Observer<Todo> = (state) => {
//   console.log('State changed:', JSON.stringify(state));
// };

// // Create a new instance of StateManager with an initial Todo state
// const reactiveState = new ReactiveState<Todo>({ id: 1, title: 'First Todo', sequence:1 }, observer);

// // Now you can get the state and it will be a Proxy of the Todo object
// const reactiveTodo = reactiveState.getState();

// // Any changes to todoState will trigger the observer function
// reactiveTodo.title = 'Updated Todo';
// reactiveTodo.title = 'Updated Todo 1';
// reactiveTodo.title = 'Updated Todo 2';

// const root = document.getElementById("root") as HTMLDivElement;
// root.appendChild(Button);