// module.exports = role => (req, res, next) => {
//   if(req.isAuthenticated() && req.user.role == role){
//     next();
//   } else {
//     res.redirect('/')
//   }
// }

module.exports = (...role) => {
  return (req, res, next) => {
    console.log(req.user.role)
    if(!role.includes(req.user.role)){
      return res.redirect('/login');
    }
    next()
  }
}