

export const cleanData = (rawData: string, additionals: string[], isInput: boolean): string =>{
    if (!rawData) {
        console.log("Empty Data");
        return "";      // Return if no data is provided
    }
    
    console.log(`Data: ${rawData}`);
    
    let size: string[] = [];
    const isMatrix = (part: string): boolean => /\[\[/g.test(part);
    const isVector = (part: string): boolean => /[\[\]]/g.test(part);
    
    const cleaned: string = rawData.split(/\b[a-zA-Z_0-9]+\s*=\s*/).filter(part => part.trim())
        .map(part => {
            // Handling Vector/Matrix for Input
            if (isInput){
                if (isMatrix(part)) {
                    // Matrix
                    console.log("Matrix:", part);
                    size.push(findSize(part, true));
                } else if (isVector(part)) {
                    // Vector
                    console.log("Vector:", part);
                    size.push(findSize(part, false));
                }
            }
            return part.replace(/\],\[/g, '\n').replace(/"/g, '').replace(/[\[\]]/g, '').replace(/,/g, ' ').trim();
        }).join('\n');
    
    console.log(`Size: ${size.join(" ")}`);
    
    // Appeding ther sizes in a separate array 
    if (isInput){
        additionals.push(size.join(" "));
    }

    return cleaned;
};

const findSize = (data: string, isMatrix: boolean): string =>{
    // Regex Match
    const arrayRegex = data.match(/\[.*\]/s);
    
    if (!arrayRegex){
        return "";
    }
    console.log(`Regex: ${arrayRegex}`);
    
    // Useful Data for modifications 
    const validData = arrayRegex[0];

    // n,m parameters -> Size: Rows,Cols
    const rows = validData.match(/\[.*?\]/g) || [];
    const rowSize = rows.length;
    const columnSize = rows[0] && rows[0] !== '[]' ? (rows[0].match(/,/g)?.length || 0) + 1 : 0;

    console.log(`n, m: ${rowSize}, ${columnSize}`);
    return isMatrix ? `${rowSize} ${columnSize}` : `${columnSize}`;;
};