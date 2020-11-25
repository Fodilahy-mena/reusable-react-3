import React, { useState, useRef, forwardRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';

// Overall, you want to be able to switch between forms.
// 1) Turn the Login/Signup forms into controlled components
// 2) Make just one form show up at a time
// 3) Make the buttons toggle which component is rendered
// 4) Forward the ref from the ToggleableForm to the components
// 5) Make a form's first input toggled when it is active using a side effect

// Reducers
let array = [1,2,3,4,5]
let add = (x,y) => x + y
let sum = array.reduce(add, 0)
// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// 15
console.log(sum)
// add the cake
let initialState = { count: 0, cake: true }
// add an action called "EAT_CAKE"
let actions = [
  { type: 'ADD', by: 2 },
  { type: 'MINUS', by: 4 },
  { type: 'ADD', by: 10 },
  {type: 'EAT_CAKE'}
]

function reducer(state, action) {
//   if (action.type === "ADD") {
//     return { ...state, count: state.count + action.by }
//   } else if (action.type === "MINUS") {
//     return { ...state, count: state.count - action.by }
//   }
// 	if(action.type === "EAT_CAKE") {
// 		return {...state, cake: state.cake = !action.by}
// 	}
// 	return state
	switch(action.type) {
		case "ADD":
			return { ...state, count: state.count + action.by }
		break;
		case "MINUS":
			return { ...state, count: state.count - action.by }
		break;
		case "EAT_CAKE":
			return {...state, cake: false}
		break;
		return state
	}
  
}

console.log(actions.reduce(reducer, initialState))

const App = () => {
	let data = [
		{ name: 'Log in', component: LoginForm },
		{ name: 'Sign up', component: SignupForm },
	];
	return (
		<section>
			<h2>Log in / Sign up</h2>
			<ToggleableForm options={data} />
		</section>
	);
};

const ToggleableForm = ({ options }) => {
	 // Change this to 1 to get the Signup form to show up
	const [currentForm, setCurrentForm] = useState(0);
	let focusRef = useRef(null);

	return (
		<>
			{options.map((el, index) => {
				return <ButtonToggle toggleForm={() => {setCurrentForm(index)}} index={index} key={`button${index}`}>{el.name}</ButtonToggle>;
			})}
			<FormToggle currentIndex={currentForm}>
				{options.map((el, index) => {
					return (
						<div key={`form${index}`}>
							{createElement(el.component, {
								/* Hmm, what should go here?*/
								ref: focusRef
							})}
						</div>
					)
				})}
			</FormToggle>
		</>
	);
};

const ButtonToggle = ({ children, toggleRef, toggleForm}) => {
	return (
		<button
			onClick={() => {
				// Hmm, things should happen here
				toggleForm();
				
			}}
		>
			{children}
		</button>
	);
};

const FormToggle = ({ children, currentIndex }) => {
	if (Array.isArray(children)) {
		return <div>{children[currentIndex]}</div>;
		// Remember, `children` is an array when there's multiple!
		// So, if you want to show all the forms, you just put
		// `children`.
		// What would you do if you just wanted to show one?
	}
	return null;
};

const LoginForm =forwardRef(( props, ref )=> {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		ref.current.focus();
	}, []);

	return (
		<>
			<input type="text" ref={ref} value={username} placeholder="Username" onChange={(e) => setUsername(e.currentTarget.value)}/>
			<input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)}/>
			<button>Submit</button>
		</>
	);
});

const SignupForm = forwardRef(( props, ref ) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		ref.current.focus();
	}, []);
	return (
		<>
			<input type="email" ref={ref} value={email} placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)}/>
			<input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.currentTarget.value)}/>
			<input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)}/>
			<button>Submit</button>
		</>
	);
});

ReactDOM.render(<App />, document.getElementById('root'));
