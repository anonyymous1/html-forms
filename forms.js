const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset)
    document.getElementById('button-send').addEventListener('click', send)

};

const reset = function(ev) {
    // HTML will automatically out the form back to initial state
    // Unless we do that
    ev.preventDefault();
    // We can reset programmatically
    document.getElementById('form-user').reset(); // This reset is particular to doc/form elements
    console.log("The page should be reset");
}

const validate = function() {
    let failures = []; // or..  let valid = true;
    
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age'); //.selectedIndex, .options, 
    const chk = document.getElementById('input-alive');  // .checked .value

    if (first.value === '') { //Empty string is falsy value
        failures.push({input: 'input-first', msg: 'Required field.'});
    }

    if (password.value === '' || password.value.length < 8) {
        failures.push({input: 'input-password', msg: 'Must be at least 8 characters.'});
    }
    
    if (email.value === '' || !email.value.includes('@')) {
        failures.push({input: 'input-email', msg: 'Required Field.'});
    }
    
    if (select.selectedIndex === 0) {
        failures.push({input: 'input-age', msg: 'Too young...'});
    }
    
    if (!chk.checked) {
        failures.push({input: 'input-alive', msg: 'Must be alive to submit form.'});
    }

    return failures;
};

const send = function(ev) {
    ev.preventDefault();  // or ev.stopPropagation(); Stop bubbling up to parent element (the click)
    let fails = validate();

    if (fails.length === 0) {
        document.getElementById('form-user').submit();
    } else {
        fails.forEach(obj => {
            const field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg);
        })
    }
};

document.addEventListener('DOMContentLoaded', init);
