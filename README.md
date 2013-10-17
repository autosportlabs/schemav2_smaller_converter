Converts v2 schema.

    {
        "s": {
          "d": [
            null,
            81,
            null,
            35,
            12.99,
            0,
            null,
            null,
            null,
            4646,
            -0.344,
            -0.409,
            1.212,
            11.727,
            null,
            null,
            47.254562,
            -123.194351,
            20.49,
            null,
            null
          ]
        }
    }

becomes

    {
      "s": {
        "d": [
          474682,
          81,
          35,
          12.99,
          0,
          4646,
          -0.344,
          -0.409,
          1.212,
          11.727,
          47.254562,
          -123.194351,
          20.49
        ]
      }
    }


`474682` is `1110001011100101010`, where each bit is set if there's a value in
that position.  Note that array indices start from the left while bits start
from the right.

The bitmap is a signed 32-bit value.  Bitwise and shift operations apparently
only work on 32-bit ints.

[What is JavaScript's Max Int? What's the highest Integer value a Number can go to without losing precision?](http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t)
