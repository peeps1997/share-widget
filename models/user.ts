export enum AccessTypes {
    FULL_ACCESS='Full Access',
    CAN_EDIT='Can Edit',
    CAN_VIEW='Can View',
    NO_ACCESS='No Access'
  }

export enum RoleTypes {
    MEMBER,
    DEVELOPER,
    ADMIN
  }

class DummyUser{
  key: number
  name: string
  access: AccessTypes
  role: RoleTypes
  constructor(key: number, name:string, access?:AccessTypes, role?: RoleTypes){
    this.name=name;
    this.access=access?access:AccessTypes.FULL_ACCESS;
    this.role=role?role:RoleTypes.MEMBER;
  }
}

class DummyGroup{
  name: string
  users: Array<DummyUser>
  constructor(key:number, name:string, users: Array<DummyUser>){
    this.name=name
    this.users=users
  }
}

export const users = [new DummyUser(0, 'Abhishek', AccessTypes.FULL_ACCESS, RoleTypes.DEVELOPER),
              new DummyUser(1, 'Yogesh', AccessTypes.FULL_ACCESS, RoleTypes.ADMIN),
              new DummyUser(2, 'Siddharth', AccessTypes.CAN_VIEW, RoleTypes.MEMBER)]

export const groups = [new DummyGroup(users.length, 'Oslash', users)]
