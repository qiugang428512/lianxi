import Long from "./Long";

/**
  *
  * @description ProtoBuf数字压缩
  *
  */
export default class ProtobufUtil {
    /**
     * Encode and write a varint. {@code value} is treated as unsigned, so it
     * won't be sign-extended if negative.
     */
    public static writeRawVarint32(buf: Laya.Byte, value: number): void {
        while (true) {
            if ((value & ~0x7F) == 0) {
                this.writeRawByte(buf, value);
                return;
            } else {
                this.writeRawByte(buf, (value & 0x7F) | 0x80);
                value >>>= 7;
            }
        }
    }

    public static writeRawVaruint64(buf: Laya.Byte, value: Long): void {
        while (true) {
            if (value.and(~0x7F).isZero()) {
                this.writeRawByte(buf, value.getLowBits());
                return;
            } else {
                this.writeRawByte(buf, (value.getLowBits() & 0x7F) | 0x80);
                value = value.shru(7);
            }
        }
    }

    /** Write a single byte. */
    private static writeRawByte(buf: Laya.Byte, value: number): void {
        buf.writeByte(value);
    }

    /**
     * Read a raw Varint from the stream. If larger than 32 bits, discard the
     * upper bits.
     */
    public static readRawVarint32(buf: Laya.Byte): number {
        return this.readRawVarint64SlowPath(buf).toInt();
    }

    public static readRawVaruint64(buf: Laya.Byte): Long {
        return this.readRawVarint64SlowPath(buf);
    }

    /** Variant of readRawVarint64 for when uncomfortably close to the limit. */
    /* Visible for testing */
    private static readRawVarint64SlowPath(buf: Laya.Byte): Long {
        var result: Long = new Long(0, 0);
        for (var shift: number = 0; shift < 64; shift += 7) {
            var b: number = this.readRawByte(buf);
            result = result.or(new Long((b & 0x7F), 0).shl(shift));
            if ((b & 0x80) == 0) {
                return result;
            }
        }
        return null;
    }

    /**
     * Read one byte from the input.
     *
     * @throws InvalidProtocolBufferException
     *             The end of the stream or the current limit was reached.
     */
    private static readRawByte(buf: Laya.Byte): number {
        return buf.readByte();
    }
}