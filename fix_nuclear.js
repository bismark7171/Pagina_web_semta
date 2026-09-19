const fs = require('fs');

// The bug is NOT in the layout. The bug is in some global component that is used by ALL pages.
// Wait! The pages themselves import components!
// Let's check `page.tsx` for the home page.
let file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

console.log(code.split('import').slice(0, 5).join('import'));
