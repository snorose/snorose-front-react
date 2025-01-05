import { useSearchParams } from 'react-router-dom';

const TAB_VIEW_PARAM_KEY = 'tab';

export default function useTabView(initialTabView) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabViewId =
    searchParams.get(TAB_VIEW_PARAM_KEY) ?? initialTabView;

  const changeTabView = (tab) => {
    searchParams.set(TAB_VIEW_PARAM_KEY, tab);
    setSearchParams(searchParams);
  };

  const TabView = ({ children }) => {
    const currentTabView = children.find(
      (element) => element.props.view === currentTabViewId
    );

    return currentTabView;
  };

  TabView.View = View;

  return { TabView, changeTabView, currentTabViewId };
}

const View = ({ children }) => {
  return <>{children}</>;
};
