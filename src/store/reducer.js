import * as actionTypes from "./actions";

const initialState = {
  contactData: [
    {
      id: "contact_Cd2gn6e6qwe",
      FirstName: "Sriharan",
      Mobile: 7502694774,
      message: [],
      profile:
        "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Red&clotheType=ShirtScoopNeck&eyeType=Cry&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=BeardLight&hairColor=BrownDark&hatColor=Heather&mouthType=Eating&skinColor=Pale&topType=Hat",
    },
  ],
  currentUserMessageData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return {
        contactData: [...state.contactData, action.data],
      };
    case actionTypes.SEND_MESSAGE:
      const newArray = state.contactData.map((el) => {
        if (el.id === action.id) {
          return { ...el, message: [...el.message, action.message] };
        }
        return el;
      });
      return {
        ...state,
        contactData: newArray,
        currentUserMessageData: {
          ...state.currentUserMessageData,
          message: [...state.currentUserMessageData.message, action.message],
        },
      };
    case actionTypes.GET_USER_MESSAGE_DATA:
      let user = state.contactData.find((el) => {
        return el.id === action.id;
      });
      return { ...state, currentUserMessageData: user };
    default:
      return state;
  }
};

export default reducer;
