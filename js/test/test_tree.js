/**
 * Created by takashima on 15/10/17.
 */


G.test.TestTree = function () {

};


G.test.TestTree.testInstance = function () {
    var tree = new G.script.Tree("ルート", null, null);
    console.log(tree.toString());
};


window.onload = G.test.TestTree.testInstance;