/**
  * Vector2D
  * Purpose: Utility class to assist in Vector manipulation in a 2D environment
  * @author Shiu
  * @version 1.0	9 August 2011
  * @version 2.0	22 August 2011
  */
export default class Vector2D {
    private _vecX: number;
    private _vecY: number;

    /**
     * Constructor of Vector2D
     * @param	mc_x	x-component of vector
     * @param	mc_y	y-component of vector
     */
    constructor(mc_x: number, mc_y: number) {
        this._vecX = mc_x;
        this._vecY = mc_y;
    }

    /**
      * Provision for an alternate constructor
      * @param	mag		Magnitude of vector
      * @param	ang_rad Orientation of vector in radians
      */
    public polar(mag: number, ang_rad: number): void {
        this._vecX = mag * Math.cos(ang_rad);
        this._vecY = mag * Math.sin(ang_rad);
    }

    /**
      * Accessors of individual x-component
      */
    public set x(new_x: number) {
        this._vecX = new_x;
    }

    public get x(): number {
        return this._vecX;
    }

    /**
      * Accessors of individual y-component
      */
    public set y(new_y: number) {
        this._vecY = new_y;
    }

    public get y(): number {
        return this._vecY;
    }

    /**
      * Method to obtain the vector
      * @return A vector array of x and y components
      */
    public getVector(): number[] {
        return [this._vecX, this._vecY]
    }

    /**
      * Method to obtain current angle of vector
      * @return Angle in radians
      */
    public getAngle(): number {
        return Math.atan2(this._vecY, this._vecX);
    }

    /**
      * Method tl alter current angle of vector
      * @param	ang_rad New angle for current vector in radians
      */
    public setAngle(ang_rad: number): void {
        var mag_current: number = this.getMagnitude();
        this.polar(mag_current, ang_rad);
    }

    /**
      * Method to obtain current magnitude of vector
      * @return Magnitude of type number
      */
    public getMagnitude(): number {
        return Math.sqrt(this._vecX * this._vecX + this._vecY * this._vecY);
    }

    /**
      * Method ot alter current magnitude of vector
      * @param	magnitude New magnitude of vector
      */
    public setMagnitude(magnitude: number): void {
        var ang_current: number = this.getAngle();
        this.polar(magnitude, ang_current);
    }

    /**
      * Method to invert both x and y components of vector
      */
    public invert(): void {
        this._vecX *= -1;
        this._vecY *= -1;
    }

    /**
      * Version 2.0
      * Method to invert only the x-component of Vector2D
      */
    public invertX(): void {
        this._vecX *= -1;
    }

    /**
      * Version 2.0
      * Method to invert only the x-component of Vector2D
      */
    public invertY(): void {
        this._vecY *= -1;
    }

    /**
      * Version 2.0
      * Method to scale current vector by a scalar magnitude
      * @param	multiplier A scalar number to mulitply current vector
      */
    public scale(magnitude: number): void {
        this._vecX *= magnitude;
        this._vecY *= magnitude;
    }

    /**
      * Method to generate a copy of current vector
      * @return A copy of current vector
      */
    public clone(): Vector2D {
        var clone1: Vector2D = new Vector2D(this._vecX, this._vecY);
        return clone1;
    }

    /**
      * Method to perform subtration on current vector
      * @param	toMinus A vector to minus current vector
      * @return A copy of subtration product
      */
    public minus(toMinus: Vector2D): Vector2D {
        var newX: number = this._vecX - toMinus.x;
        var newY: number = this._vecY - toMinus.y;
        return new Vector2D(newX, newY);
    }

    /**
      * Method to perform addition on current vector
      * @param	toAdd A vector to add onto current vector
      * @return A copy of addition product
      */
    public add(toAdd: Vector2D): Vector2D {
        var newX: number = this._vecX + toAdd.x;
        var newY: number = this._vecY + toAdd.y;
        return new Vector2D(newX, newY);
    }

    /**
      * Version 2.0
      * Method to multiply current vector with a certain magnitude
      * @param	multiplier
      * @return A copy of the multiplied product
      */
    public multiply(multiplier: number): Vector2D {
        var newX: number = this._vecX * multiplier;
        var newY: number = this._vecY * multiplier;
        return new Vector2D(newX, newY);
    }

    /**
      * Method to rotate current vector
      * @param	angle_rad Angle in radian to rotate current vector
      * @param	offset A vector to offset current circular into an eliptical course
      * @return A copy of the rotated vector
      */
    public rotate(angle_rad: number): Vector2D {
        var newX: number = this._vecX * Math.cos(angle_rad) - this._vecY * Math.sin(angle_rad);
        var newY: number = this._vecX * Math.sin(angle_rad) + this._vecY * Math.cos(angle_rad);

        return new Vector2D(newX, newY);
    }

    /**
      * Method to obtain vector unit of current vector
      * @return A copy of normalised vector
      */
    public normalise(): Vector2D {
        return new Vector2D(this._vecX / this.getMagnitude(), this._vecY / this.getMagnitude());
    }

    /**
      * Method to perform dot product with another vector
      * @param	vector2 A vector to perform dot product with current vector
      * @return A scalar number of dot product
      */
    public dotProduct(vector2: Vector2D): number {
        var componentX: number = this._vecX * vector2.x;
        var componentY: number = this._vecY * vector2.y;
        return componentX + componentY;
    }

    /**
      * Method to perform vector product of current vector with input vector
      * @param	vector2 A vector to perform vector product with current vector
      * @return The magnitude of pseudo-vector on z-axis
      */
    public vectorProduct(vector2: Vector2D): number {
        return this._vecX * vector2.y - this._vecY * vector2.x;
    }

    /**
      * Method to obtain the smaller angle, in radian, sandwiched from current vector to input vector
      * @param	vector2 A vector to bound the angle
      * @return Angle in radian, positive is clockwise, negative is anti-clockwise
      */
    public angleBetween(vector2: Vector2D): number {
        //get normalised vectors
        var norm1: Vector2D = this.normalise();
        var norm2: Vector2D = vector2.normalise();

        //dot product of vectors to find angle
        var product: number = norm1.dotProduct(norm2);
        product = Math.min(1, product);
        var angle: number = Math.acos(product);

        //sides of angle
        if (this.vectorProduct(vector2) < 0) angle *= -1
        return angle;
    }

    /**
      * Method to obtain the projection of current vector on a given axis
      * @param	axis An axis where vector is projected on
      * @return The projection length of current vector on given axis
      */
    public projectionOn(axis: Vector2D): number {
        return this.dotProduct(axis.normalise())
    }
}