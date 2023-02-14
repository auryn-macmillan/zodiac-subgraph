import { ModuleProxyCreation } from "../generated/ModuleProxyFactory/ModuleProxyFactory";
import { Module } from "../generated/schema";

export function handleModuleProxyCreation(event: ModuleProxyCreation): void {
  const id: string = event.params.proxy.toHexString();
  let entity: Module | null = Module.load(id);
  if (entity == null) {
    entity = new Module(id);
  }
  entity.mastercopy = event.params.masterCopy;
  entity.deployer = event.transaction.from;
  entity.created = event.block.timestamp;
  entity.save();
}
