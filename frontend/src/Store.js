import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { SearchReducer, UserReducer } from "./Reducers/UerReducer";
import GetCookie from "./Middleware/GetCookie";
import {
  AddUserChatReducer,
  FetchAllChatRedcer,
  GroupOperationsReducer,
  SelectedUserReducer,
} from "./Reducers/ChatReducer";
import {
  FetchMessagesReducer,
  SendMessageReducer,
} from "./Reducers/MessageReducer";

const Reducer = combineReducers({
  User: UserReducer,
  SearchUser: SearchReducer,
  FetchChats: FetchAllChatRedcer,
  AddUser: AddUserChatReducer,
  GroupOperation: GroupOperationsReducer,
  SelectedUser: SelectedUserReducer,
  FetchMessages: FetchMessagesReducer,
  SendMessage: SendMessageReducer,
});

const initialState = {
  User: {
    token: GetCookie() ? GetCookie() : null,
  },
};

const middleware = [thunk];

const Store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
