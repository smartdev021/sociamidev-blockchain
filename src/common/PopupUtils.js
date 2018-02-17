const ParentElementID = 'popup-root';

export const getPopupParentElement = () => {
    let parentElement = document.getElementById(ParentElementID);

    if (!parentElement) {
        console.log(`%cParent with id: ${ParentElementID}`, "background:red;color:white;");
        parentElement = document.body;
    }

    return parentElement;
}