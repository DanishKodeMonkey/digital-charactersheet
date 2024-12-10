export interface ArmorTypeProp {
  name: string;
}

export interface MiscItemTypeProp {
  name: string;
}

export interface ShieldTypeProp {
  name: string;
}

export interface WeaponTypeProp {
  name: string;
}
export interface Item {
  index: number;
  name: string;
  note: string;
}

export interface Possession {
  item: string;
  amount: number;
  weight: number;
}

export interface wallet {
  gold: number;
  silver: number;
  copper: number;
}
