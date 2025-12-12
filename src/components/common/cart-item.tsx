import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantTotalPriceInCents: number;
  quantity: number;
  productVariantId: string;
}

const CartItem = ({
  id,
  productName,
  productVariantImageUrl,
  productVariantName,
  productVariantTotalPriceInCents,
  quantity,
  productVariantId,
}: CartItemProps) => {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Item removido da sacola");
      },
      onError: () => {
        toast.error("Erro ao remover item da sacola");
      },
    });
  };

  const handleDecreaseClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao diminuir quantidado do item da sacola");
      },
    });
  };

  const handleIncreaseQuantityClieck = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao incluir quantidado do item da sacola");
      },
    });
  };

  return (
    <div className="items center flex justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">{productName}</div>
          <div className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </div>
          <div className="flex w-[100px] items-center justify-between gap-4 rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseClick}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseQuantityClieck}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantTotalPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
