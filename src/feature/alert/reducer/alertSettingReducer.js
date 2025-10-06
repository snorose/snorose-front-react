export function alertSettingReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ALERT':
      const next = !state.alert;

      return {
        alert: next,
        advertisement: next ? state.advertisement : false,
        attendance: next ? state.attendance : false,
      };

    case 'TOGGLE_ADVERTISEMENT':
      if (!state.alert) return state;

      return {
        ...state,
        advertisement: !state.advertisement,
      };

    case 'TOGGLE_ATTENDANCE':
      if (!state.alert) return state;

      return {
        ...state,
        attendance: !state.attendance,
      };

    default:
      return state;
  }
}
