// import { useSelector } from "react-redux";

const CheckSender = (id, users) => {
  // const { user } = useSelector((state) => state.User);
  return users[0]._id === id ? users[1].name : users[0].name;
  // return "shahid";
};

export const CheckSenderAvatar = (users) => {
  // const { user } = useSelector((state) => state.User);
  // console.log(user);
  // console.log(users);

  // let x =
  //   users[0]._id === user._id ? users[1].profile.url : users[0].profile.url;
  return "hello";
};

export default CheckSender;
