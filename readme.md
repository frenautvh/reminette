# Reminette

## Usage

Multiply each rem units in less files contained in *sourcedir* by 0.625 coefficient.

```bash
# 1rem -> 0.625rem
reminette multiply -c 0.625 <sourcedir>
```

Replace rem-calc in less files contained in *sourcedir* by 0.625 coefficient.

```bash
# rem-calc(1) -> 0.625rem
reminette remcalc -c 0.625 <sourcedir>
```

### Caution
If you fix remcalc first, don't forget that calling the multiply command later will apply the coefficient on each rem units. So you might apply coefficient twice.
