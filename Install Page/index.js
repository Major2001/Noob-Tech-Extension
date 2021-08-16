const makeId = (userEmail) => {
  return (
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    Date.now() +
    btoa(userEmail)
  );
};
window.onload = () => {
  const form = document.getElementById('signup-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const userName = e.target.user_name.value;
    const userEmail = e.target.user_email.value;
    const userId = makeId(userEmail);
    localStorage.setItem('user', JSON.stringify({ userName, userId }));
  };
};
