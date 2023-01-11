const parser = require('./format4');
const helper = require('../_helper/parse')(parser);

const options = {
  placeholder_mark: '#',
  placeholder_bracket_open: '{',
  placeholder_bracket_close: '}',
};

const input1 = `
report {
  code {
    100
  }
  output {
    "#{code}"
  }
}
`;
helper.dump(input1, options);

const input2 = `
report {
  code {
    100
  }
  output {
    "##{code}"
  }
}
`;
helper.dump(input2, options);

const input3 = `
report {
  code {
    100
  }
  output {
    "##{code}#"
  }
}
`;
helper.dump(input3, options);

const input4 = `
report {
  code {
    100
  }
  output {
    "#[code]"
  }
}
`;
helper.dump(input4, options);

const input5 = `
report {
  code {
    100
  }
  output {
    "{code}"
  }
}
`;
helper.dump(input5, options);
