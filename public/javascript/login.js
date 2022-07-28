async function signupFormHandler(event) {
    event.preventDefault();

    //get input from form and trim whitespace
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    //validate input
    if(username && email && password) {
        //make fetch call to api route
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        //check response data
        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else {
            //throw error alert
            alert(response.statusText);
        }

    }
}

async function loginFormHandler(event) { 
    event.preventDefault();

    //get input from form and trim whitespace
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    //validate input
    if(email && password) {
        //make fetch call to api route
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        //check response data
        if (response.ok) {
            document.location.replace('/');
        } else {
            //throw error alert
            alert(response.statusText);
        }
    }
}

//test user credentials
//boogie@js.com
//wopwop44
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
