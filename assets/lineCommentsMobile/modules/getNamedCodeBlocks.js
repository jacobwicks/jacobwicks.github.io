import { isNamedBlock } from './isNamedBlock.js';

export const getNamedCodeBlocks = () => {
    //jekyll puts all code blocks inside an element with class 'rouge-table'
    const rougeTables = [...document.getElementsByClassName('rouge-table')];

    //reduce the array of rouge-table elements to an array
    //of each codeblock with line numbers
    const linedBlocks = rougeTables.reduce((blocksWithLines, table) => {
        if (table.querySelectorAll('pre.lineno, td.code').length === 2) {
            blocksWithLines.push(table);
        }
        return blocksWithLines;
    }, []);

    //reduce linedBlocks to an object
    //that contains the name of each lined code block that the user named
    //paired with the blockIndex of that block
    return linedBlocks.reduce((namedBlocks, linedBlock, blockIndex) => {
        const code = linedBlock.getElementsByClassName('code')[0];
        if (code) {
            const named = isNamedBlock(code);
            if (named) {
                const { name, indexOfSecondLine } = named;
                const pre = code.children[0];
                const newInnerHTML = pre.innerHTML.slice(
                    indexOfSecondLine,
                    pre.innerHTML.length
                );
                pre.innerHTML = newInnerHTML;
                namedBlocks[name] = blockIndex;
            }
        }

        return namedBlocks;
    }, {});
};
