const isLoggedIn = (navigate, authState) => {
  if (authState && authState.accessToken) {
    navigate(`/${authState.userRole}`);
  }
};

export default isLoggedIn;
