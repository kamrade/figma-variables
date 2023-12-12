type Mode = 'strict' | 'cut' | 'flexible';

interface IOptions {
  firstCapital?: boolean;
  mode: Mode;
}

const jsVariablePattern = `^[^a-zA-Z_$]|[^\\w$]`;

export const validateJSVariable = (s: string, options: IOptions) => {
  let opts: IOptions = {
    mode: 'strict',
    ...options,
  }

  const patterns = [
    `^( +)${opts.firstCapital ? '.' : ''}`, 
    '( +).', '( +)$', 
    `^(-+)${opts.firstCapital ? '.' : ''}`, 
    '(-+).', '(-+)$'
  ];


  if (opts.mode === 'strict') {
    let result = false;
    
    patterns.map((pattern, i) => {
      let regexp = new RegExp(`${jsVariablePattern}`, 'g');
      result = regexp.test(s) || result;
    });

    return result ? 'Invalid' : 'Valid';

  
  } else if (opts.mode === 'cut') {
      patterns.map((pattern, i) => {
        s = s.replace(new RegExp(`${pattern}`, 'g'), (x) => 
          pattern[pattern.length - 1] === '.' ? x[x.length - 1].toUpperCase() : '');
      });
      s = s.replace(new RegExp(`${jsVariablePattern}`, 'g'), (x) => '');
      return s;
    
    
  }  else if (opts.mode === 'flexible') {
    return s.replace(new RegExp(`${jsVariablePattern}`, 'g'), (x) => '_');
  }
}