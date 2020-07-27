import React from "react";
import Search from "./Tests/SearchFeature/Search";
import CustomEffectHook from "./CustomHooks/CustomEffect/CustomEffectHook";
import CustomStateHook from "./CustomHooks/CustomState/CustomStateHook";
import CustomSubscriptionHook from "./CustomHooks/CustomSubscription/CustomSubscriptionHook";

const App = () => {
  return (
    <div className="App">
      <CustomEffectHook />
      <CustomStateHook />
      <Search />
      <CustomSubscriptionHook />
    </div>
  );
};

export default App;
