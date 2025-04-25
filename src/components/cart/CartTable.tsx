
import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

interface CartTableProps {
  cart: {
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
      discountPrice?: number;
      category: string;
    };
    quantity: number;
  }[];
  onQuantityChange: (idx: number, delta: number) => void;
  onRemove: (idx: number) => void;
}

const CartTable: React.FC<CartTableProps> = ({
  cart,
  onQuantityChange,
  onRemove,
}) => {
  const { formatPrice } = useRegion();
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-4">{t('product')}</th>
            <th className="text-center p-4">{t('quantity')}</th>
            <th className="text-right p-4">{t('price')}</th>
            <th className="p-4 w-8"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {cart.map((item, index) => (
            <tr key={item.product.id}>
              <td className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded bg-muted mr-4 overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.category}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center">
                  <button
                    className="p-1 rounded-full hover:bg-muted"
                    onClick={() => onQuantityChange(index, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="mx-3 w-8 text-center">{item.quantity}</span>
                  <button
                    className="p-1 rounded-full hover:bg-muted"
                    onClick={() => onQuantityChange(index, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="font-medium">
                  {formatPrice(
                    (item.product.discountPrice || item.product.price) *
                      item.quantity
                  )}
                </div>
                {item.product.discountPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                )}
              </td>
              <td className="p-4">
                <button
                  className="p-1 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(index)}
                  aria-label="Remove from cart"
                >
                  <X size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
