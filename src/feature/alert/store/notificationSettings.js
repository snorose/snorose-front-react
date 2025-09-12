// 알림 수신 설정 다음 상태값 계산
function notificationSettingsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'REQUIRED': {
      return {
        required: payload.value,
        marketing: false,
        attendance: false,
      };
    }

    case 'MARKETING': {
      if (!state.required) return state;

      return {
        ...state,
        marketing: payload.value,
      };
    }

    case 'ATTENDANCE': {
      if (!state.required) return state;

      return {
        ...state,
        attendance: payload.value,
      };
    }

    case 'HYDRATE': {
      return normalize(action.payload);
    }

    default:
      return state;
  }
}

function normalize(setting) {
  if (!setting.required) {
    return {
      ...setting,
      marketing: false,
      attendance: false,
    };
  }

  return setting;
}

const actions = {
  required: (value) => ({ type: 'REQUIRED', payload: { value } }),
  marketing: (value) => ({ type: 'MARKETING', payload: { value } }),
  attendance: (value) => ({ type: 'ATTENDANCE', payload: { value } }),
  hydrate: (setting) => ({ type: 'HYDRATE', payload: setting }),
};

export { notificationSettingsReducer as reducer };
export { actions };
