/**
 * 管理者用のクラスです
 *@remarks
 *詳細
 */
export class Administrator {
  constructor(
    //管理者のID
    private _id: number,
    //管理者の名前
    private _name: string,
    //管理者のメールアドレス
    private _mailAddress: string,
    //管理者のパスワード
    private _password: string
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get mailAddress(): string {
    return this._mailAddress;
  }

  public set mailAddress(mailAddress: string) {
    this._mailAddress = mailAddress;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }
}
