import { interval, take } from 'rxjs';
import { useEffect } from './jsx-runtime';

const Button = () => {

//   const [count, setCount] = useState(0);
  const count = 0
  const count$ = interval(1000).pipe(take(5)).subscribe((v) => count = count + v);

  
  useEffect(() => console.log('count:', count));
  
  return (
    <div>
      <h1>Count: {count}</h1>
      {/* <button onClick={() => setCount((c) => c + 1)}>Increment</button> */}
    </div>
  );
};
export default Button;