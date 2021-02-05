import Loadable from "react-loadable";

// 注册检查
const modelNotExisted = (app, model) =>
    !app._models.some(({ namespace }) => {
        return namespace === model.substring(model.lastIndexOf("/") + 1);
    });

// 动态引入组件
export function asynImport(loading = null, importComponent, storeArr, app) {
    function routerCreate() {
        storeArr &&
            storeArr.forEach((model) => {
                if (modelNotExisted(app, model)) {
                    app.model(require(`@/models/${model}`).default);
                }
            });
        return importComponent();
    }

    return Loadable({
        loader: () => routerCreate(),
        loading,
    });
}
