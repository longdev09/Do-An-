const initState = {
  // luu tru token giang vien
  isAuthenMentor: localStorage.getItem("tokenGv") !== null,
  tokenGv: localStorage.getItem("tokenGv"),

  // luu tru token hoc vien
  isAuthenUser: localStorage.getItem("tokenHv") !== null,
  tokenHv: localStorage.getItem("tokenHv"),

  // Phần giỏ hàng
  cart: [],

  // khoa hoc thanh toan
  khoaHocSelect: JSON.parse(localStorage.getItem("khoaHocSelect")) || [],
};
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_MENTOR":
      localStorage.setItem("tokenGv", action.payload);
      return {
        ...state,
        isAuthenMentor: true,
        tokenGv: action.payload,
      };

    // Đăng xuất user
    case "LOGOUT_USER":
      localStorage.removeItem("tokenHv");
      return {
        ...state,
        isAuthenUser: false,
        tokenHv: null,
      };

    case "LOGIN_USER":
      localStorage.setItem("tokenHv", action.payload);
      return {
        ...state,
        isAuthenUser: true,
        tokenHv: action.payload,
      };

    //them kh hoc vao cart
    case "ADD_TO_CART":
      const updatedCartAdd = [...state.cart, action.payload];
      return {
        ...state,
        cart: updatedCartAdd,
      };

    case "DELETE_TO_CART":
      const updatedCartRemove = state.cart.filter(
        (item) => item.maKh !== action.payload
      );
      return {
        ...state,
        cart: updatedCartRemove,
      };

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
      };

    // khoahoc select
    case "KHOA_HOC_SELECT":
      localStorage.setItem("khoaHocSelect", JSON.stringify(action.payload));
      return {
        ...state,
        khoaHocSelect: action.payload,
      };
    default:
      return state;
  }
}
export { initState };
export default reducer;
