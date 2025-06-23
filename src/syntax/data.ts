// anything in a TS file is "private" to this file.
// it becomes a "module" when you export at least one thing

const add = (a: number, b: number) => a + b;

const sum = add(1, 2);
